export class Tools {

  // ------------------------------------------------------------------
  // Converts the specified byte array to a Base64 string
  // ------------------------------------------------------------------
  static arrayBufferToBase64 (arrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array (arrayBuffer);
    var length = bytes.byteLength;

    for (var byteCounter = 0; byteCounter < length; byteCounter++) {
        binary += String.fromCharCode (bytes[byteCounter]);
    }
    return window.btoa (binary);
  }

  // ------------------------------------------------------------------
  // Converts the specified EPOCH string to a date in the current time zone
  // ------------------------------------------------------------------
  static getDateFromEpoch (epoch){

    var date = new Date(0); // Create date for EPOCH start (January 1st 1970 00:00:00 UTC)

    if (epoch == null) return date;

    // Extract seconds from EPOC string
    let utcSeconds = epoch.slice(6,16); //   Example: "/Date(1325977200000)/" --> "1325977200"
                                                   // "/Date(-3600000+0100)/" --> Date not set

    // If the date value is negative, return EPOCH start
    if (!utcSeconds.startsWith("-"))
      date.setUTCSeconds(utcSeconds);

    return date;
  }

  // ------------------------------------------------------------------
  // Formats the date of the current time zone in the browser's language
  // ------------------------------------------------------------------
  static getFormatedDateString (date: Date) {
    let formatedDate: string = '';

    if (date.getTime() == new Date(0).getTime()) {
      // 1/1/1970 --> Date not set  
      formatedDate = '';
    } else {
       let language: string = navigator.language; 

       // Format date
       var options = {year: 'numeric', month: '2-digit', day: '2-digit' };
       formatedDate = new Intl.DateTimeFormat(language, options).format(date);
    }

    return formatedDate;
  }
  
  // ------------------------------------------------------------------
  // Manage session variables
  // ------------------------------------------------------------------
  static setStorageValue(key: string, value: string){
    window.sessionStorage.setItem(key, value);
  }

  static getStorageValue(key: string){
    return window.sessionStorage.getItem(key);
  }

  static removeStorageValue(key: string){
    return window.sessionStorage.removeItem(key);
  }
}