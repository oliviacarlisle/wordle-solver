import offensiveWords from './offensiveWords';
import pluralWords from './pluralWords';

const excludeList = new Set([...offensiveWords, ...pluralWords]);

export default excludeList;
