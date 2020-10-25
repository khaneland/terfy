import React from 'react';
import Mousetrap, {MousetrapInstance} from 'mousetrap';

import {connect} from '../utils/plugins';
import * as uiActions from '../actions/ui';
import {getRegisteredKeys, getCommandHandler, shouldPreventDefault} from '../command-registry';
import stylis from 'stylis';

import {HeaderContainer} from './header';
import TermsContainer from './terms';
import NotificationsContainer from './notifications';
import {TerfyState, TerfyProps, TerfyDispatch} from '../terfy';
import Terms from '../components/terms';

const isMac = /Mac/.test(navigator.userAgent);

class Terfy extends React.PureComponent<TerfyProps> {
  mousetrap!: MousetrapInstance;
  terms!: Terms;
  constructor(props: TerfyProps) {
    super(props);
  }

  componentDidUpdate(prev: TerfyProps) {
    if (this.props.backgroundColor !== prev.backgroundColor) {
      // this can be removed when `setBackgroundColor` in electron
      // starts working again
      document.body.style.backgroundColor = this.props.backgroundColor;
    }
    const {lastConfigUpdate} = this.props;
    if (lastConfigUpdate && lastConfigUpdate !== prev.lastConfigUpdate) {
      this.attachKeyListeners();
    }
    if (prev.activeSession !== this.props.activeSession) {
      this.handleFocusActive(this.props.activeSession!);
    }
  }

  handleFocusActive = (uid?: string) => {
    const term = uid && this.terms.getTermByUid(uid);
    if (term) {
      term.focus();
    }
  };

  handleSelectAll = () => {
    const term = this.terms.getActiveTerm();
    if (term) {
      term.selectAll();
    }
  };

  attachKeyListeners() {
    if (!this.mousetrap) {
      this.mousetrap = new (Mousetrap as any)(window, true);
      this.mousetrap.stopCallback = () => {
        // All events should be intercepted even if focus is in an input/textarea
        return false;
      };
    } else {
      this.mousetrap.reset();
    }

    const keys = getRegisteredKeys();
    Object.keys(keys).forEach((commandKeys) => {
      this.mousetrap.bind(
        commandKeys,
        (e: any) => {
          const command = keys[commandKeys];
          // We should tell to xterm that it should ignore this event.
          e.catched = true;
          this.props.execCommand(command, getCommandHandler(command), e);
          shouldPreventDefault(command) && e.preventDefault();
        },
        'keydown'
      );
    });
  }

  componentDidMount() {
    this.attachKeyListeners();
    window.rpc.on('term selectAll', this.handleSelectAll);
  }

  onTermsRef = (terms: Terms) => {
    this.terms = terms;
    window.focusActiveTerm = this.handleFocusActive;
  };

  componentWillUnmount() {
    document.body.style.backgroundColor = 'inherit';
    this.mousetrap?.reset();
  }

  render() {
    const {isMac: isMac_, customCSS, uiFontFamily, borderColor, maximized, fullScreen} = this.props;
    const borderWidth = isMac_ ? '' : `${maximized ? '0' : '1'}px`;
    stylis.set({prefix: false});
    return (
      <div id="Terfy">
        <div
          style={{fontFamily: uiFontFamily, borderColor, borderWidth}}
          className={`Terfy_main ${isMac_ && 'Terfy_mainRounded'} ${fullScreen ? 'fullScreen' : ''}`}
        >
          <HeaderContainer />
          <TermsContainer ref_={this.onTermsRef} />
          {this.props.customInnerChildren}
        </div>

        <NotificationsContainer />

        {this.props.customChildren}

        <style jsx>
          {`
            .terfy_main {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border: 1px solid #333;
            }

            .terfy_mainRounded {
              border-radius: 5px;
            }
          `}
        </style>

        {/*
          Add custom CSS to Terfy.
          We add a scope to the customCSS so that it can get around the weighting applied by styled-jsx
        */}
        <style dangerouslySetInnerHTML={{__html: stylis('#terfy', customCSS)}} />
      </div>
    );
  }
}

const mapStateToProps = (state: TerfyState) => {
  return {
    isMac,
    customCSS: state.ui.css,
    uiFontFamily: state.ui.uiFontFamily,
    borderColor: state.ui.borderColor,
    activeSession: state.sessions.activeUid,
    backgroundColor: state.ui.backgroundColor,
    maximized: state.ui.maximized,
    fullScreen: state.ui.fullScreen,
    lastConfigUpdate: state.ui._lastUpdate
  };
};

const mapDispatchToProps = (dispatch: TerfyDispatch) => {
  return {
    execCommand: (command: string, fn: (e: any, dispatch: TerfyDispatch) => void, e: any) => {
      dispatch(uiActions.execCommand(command, fn, e));
    }
  };
};

const TerfyContainer = connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Terfy, 'Terfy');

export default TerfyContainer;

export type TerfyConnectedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
