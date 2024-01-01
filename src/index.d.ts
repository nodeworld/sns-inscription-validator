declare module inscriptionModule {
    /* By default isArabic validation is true. Pass parameter as false to not validate arabc letters. */
    export default function validateInscription(value: string, isArabic?: boolean): SnsValidationResponse;
}

interface SnsValidationResponse {
    isInscriptionValid: boolean;
    type: string;
    hasArabic?: boolean
  }
  