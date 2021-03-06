import _ from 'lodash';

// remove all not common letters and characters from string
export default (string, options = {}) => {
    const sanitizedFileName = _.chain(string)
        // split at dots
        .split(/\./)
        // remove ensureType if filename ends with it
        .tap(array => {
            if (
                _.has(options, 'ensureType') &&
                _.last(array) === options.ensureType
            ) {
                array.pop();
            }
        })
        // join with dots
        .join('.')
        // convert to basic latin letters
        .deburr()
        // replace all not-words (like '[') with '_'
        .replace(/\W/g, '_')
        // remove multiple '_'
        .replace(/_+/g, '_')
        // remove '_' from start and end
        .trim('_')
        .value();

    // ensure that file name ends with the type
    if (_.has(options, 'ensureType')) {
        return `${sanitizedFileName}.${options.ensureType}`;
    }

    // return
    return sanitizedFileName;
};
