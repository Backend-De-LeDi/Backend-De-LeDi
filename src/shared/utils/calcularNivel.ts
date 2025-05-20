import { format } from "morgan";

export const calcular_age = (date: Date): String => {
    const newDate = new Date()
    const newDates = newDate.getTime();
    const format_date = date.getTime();

    const age: number = Math.floor((newDates - format_date) / (1000 * 60 * 60 * 24 * 365.25));

    const algo: String = 'algo'
    return algo
}