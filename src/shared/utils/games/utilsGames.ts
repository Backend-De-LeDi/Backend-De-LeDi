import { Gamble } from "../../types/gamesTypes/createYourHistory";

export class UtilsGames {
     static isValidGamblePayload(body: any): boolean {
          return (
               body &&
               body.title !== undefined &&
               body.scenery !== undefined &&
               body.page !== undefined &&
               body.option !== undefined
          );
     }

     static buildGambleFromPayload(body: any): Gamble {
          return {
               title: body.title,
               scenery: body.scenery,
               page: body.page,
               option: body.option,
               score: 0,
          };
     }


}