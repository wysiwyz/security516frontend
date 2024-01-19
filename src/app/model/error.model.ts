
export class Error {

    public errorCode: string;
    public errorMessage: string;
    
    constructor(errorCode?: string, errorMessage?: string){
          this.errorCode = errorCode || '';
          this.errorMessage = errorMessage || '';       
    }
  
  }
  