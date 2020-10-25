import {createSelector} from 'reselect';
import {TerfyState} from './terfy';

const getTermGroups = ({termGroups}: Pick<TerfyState, 'termGroups'>) => termGroups.termGroups;
export const getRootGroups = createSelector(getTermGroups, (termGroups) =>
  Object.keys(termGroups)
    .map((uid) => termGroups[uid])
    .filter(({parentUid}) => !parentUid)
);
