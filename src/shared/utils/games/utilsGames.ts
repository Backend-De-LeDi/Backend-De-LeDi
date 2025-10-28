import { Gamble, Quiz } from "../../types/gamesTypes/gameTypes";
import { ResGameHistory, ResGameHistoryFinal, ResGameQuiz, ResGameQuizFinal } from "../../types/gamesTypes/gameTypes";

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

  static isFinal(res: ResGameHistory | ResGameHistoryFinal): res is ResGameHistoryFinal {
    return 'completed' in res;
  }

  static isHistory(res: ResGameHistory | ResGameHistoryFinal): res is ResGameHistory {
    return 'options' in res;
  }

  // Validación para Quiz
  static isValidQuizPayload(body: any): boolean {
    return (
      body &&
      body.title !== undefined &&
      body.scenery !== undefined &&
      body.page !== undefined &&
      body.option !== undefined &&
      typeof body.option.text === "string" &&
      typeof body.option.status === "boolean"
    );
  }

  static buildQuizFromPayload(body: any): Quiz {
    return {
      title: body.title,
      scenery: body.scenery,
      page: body.page,
      score: typeof body.score === "number" ? body.score : 0,
      option: {
        text: body.option.text,
        status: body.option.status,
      },
    };
  }

  static isQuizFinal(res: ResGameQuiz | ResGameQuizFinal): res is ResGameQuizFinal {
    return "completed" in res;
  }

  static isQuizActive(res: ResGameQuiz | ResGameQuizFinal): res is ResGameQuiz {
    return "options" in res;
  }


}
