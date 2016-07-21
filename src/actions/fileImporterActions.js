import * as constants from 'constants';
import fileImporterApi from 'api/mockFileImporterApi';
import { ajaxCallStart, ajaxCallError, ajaxCallSuccess } from './ajaxStatusActions';

export function parseFileSuccess(file) {
  return { type: constants.PARSE_FILE_SUCCESS, file };
}

export function parseFile(file) {

  return function(dispatch) {
    dispatch(ajaxCallStart());

    return fileImporterApi.parseRbFile(file)
    .then((parsedFile) => {
      dispatch(ajaxCallSuccess());
      dispatch(parseFileSuccess(parsedFile));
    }).catch((error) => {
      dispatch(ajaxCallError(error));
      throw error;
    });

  };

}
