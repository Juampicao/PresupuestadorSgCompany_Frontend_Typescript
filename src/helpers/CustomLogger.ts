export default class CustomLogger {
  constructor() {}

  /**
   * Log info message.
   * @param {*string} message
   * @param {*object} object
   */
  logInfo(message: string, object = "") {
    console.log(message, object);
  }

  /**
   * Log debug message.
   * @param {*string} message
   * @param {*object} object
   */
  logDebug(message: string, object: any = "") {
    console.debug(message, object);
  }

  /**
   * Log Error message.
   * @param {*string} message
   * @param {*error} error
   */
  logError(message:string = "", error: Error) {
    console.error("Error:", message, error);
  }
}
