import * as regTypes from './typings/native-reg';
if (process.platform === 'win32') {
  try {
    // eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
    var Registry: typeof regTypes = require('native-reg');
  } catch (err) {
    console.error(err);
  }
}

const appPath = `"${process.execPath}"`;
const regKeys = [
  `Software\\Classes\\Directory\\Background\\shell\\Terfy`,
  `Software\\Classes\\Directory\\shell\\Terfy`,
  `Software\\Classes\\Drive\\shell\\Terfy`
];
const regParts = [
  {key: 'command', name: '', value: `${appPath} "%V"`},
  {name: '', value: 'Open Terfy here'},
  {name: 'Icon', value: `${appPath}`}
];

function addValues(terfyKey: regTypes.TKEY, commandKey: regTypes.TKEY) {
  try {
    Registry.setValueSZ(terfyKey, regParts[1].name, regParts[1].value);
  } catch (error) {
    console.error(error);
  }
  try {
    Registry.setValueSZ(terfyKey, regParts[2].name, regParts[2].value);
  } catch (err) {
    console.error(err);
  }
  try {
    Registry.setValueSZ(commandKey, regParts[0].name, regParts[0].value);
  } catch (err_) {
    console.error(err_);
  }
}

export const add = () => {
  regKeys.forEach((regKey) => {
    try {
      const terfyKey =
        Registry.openKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS) ||
        Registry.createKey(Registry.HKCU, regKey, Registry.Access.ALL_ACCESS);
      const commandKey =
        Registry.openKey(Registry.HKCU, `${regKey}\\${regParts[0].key}`, Registry.Access.ALL_ACCESS) ||
        Registry.createKey(Registry.HKCU, `${regKey}\\${regParts[0].key}`, Registry.Access.ALL_ACCESS);
      addValues(terfyKey, commandKey);
      Registry.closeKey(terfyKey);
      Registry.closeKey(commandKey);
    } catch (error) {
      console.error(error);
    }
  });
};

export const remove = () => {
  regKeys.forEach((regKey) => {
    try {
      Registry.deleteTree(Registry.HKCU, regKey);
    } catch (err) {
      console.error(err);
    }
  });
};
