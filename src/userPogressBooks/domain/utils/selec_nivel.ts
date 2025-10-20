import { LevelService } from "../../../Leves/app/services/Level.service";
import { ILevesRepo } from "../../../Leves/domain/ports/levelPorts";
import { LevelMongoRepository } from "../../../Leves/infrastructure/Level.mongoRepository";

const levelRepository: ILevesRepo = new LevelMongoRepository();
const levelService = new LevelService(levelRepository);


const LEVEL_MAP: { [key: number]: string } = {
    1: "ONE",
    2: "DOS",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX",
    7: "SEVEN"
};

export async function selectLevel(levelNumber: number): Promise<string> {
    const levelCode = LEVEL_MAP[levelNumber];

    if (!levelCode) {
        throw new Error(`Invalid level: ${levelNumber}`);
    }

    try {
        const level = await levelService.findLevel(levelCode);
        return level._id.toString();
    } catch (error) {
        throw new Error(`Error retrieving level ${levelNumber}`);
    }
}