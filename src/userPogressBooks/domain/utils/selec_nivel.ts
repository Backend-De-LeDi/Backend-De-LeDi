
import { LevelService } from "../../../gamification/levels/app/services/Level.service";
import { ILevelsRepo } from "../../../gamification/levels/domain/ports/levelPorts";
import { LevelMongoRepository } from "../../../gamification/levels/infrastructure/Level.mongoRepository";
import { FindAndDeleteUser } from "../../../userService/application/service/FindAndDelete.service";
import { FindAndDeleteRepo } from "../../../userService/domain/ports/FindAndDeleteRepo";
import { findAndDeleteMongo } from "../../../userService/infrastructure/userRespositoryMongo";

const levelMongo: ILevelsRepo = new LevelMongoRepository();
const levelControllers = new LevelService(levelMongo);
const findAndDeleteUser: FindAndDeleteRepo = new findAndDeleteMongo();
const findAndDelService: FindAndDeleteUser = new FindAndDeleteUser(findAndDeleteUser);



export async function selecLevel(id: string) {
    const userFind = await findAndDelService.findByID(id);
    if (!userFind) return null;

    const currentLevelId = userFind.level;
    const currentLevel = await levelControllers.findLevelByID(currentLevelId);
    if (!currentLevel) return null;

    // SI NO SUBE DE NIVEL → DEVUELVE OBJETO
    if (userFind.point < currentLevel.maxPoint) {
        return {
            id: currentLevelId,
            img: currentLevel.img.url_secura
        };
    }

    const nextLevelNumber = currentLevel.level + 1;
    const nextLevel = await levelControllers.findLevel(nextLevelNumber);

    if (!nextLevel) {
        return {
            id: currentLevelId,
            img: currentLevel.img.url_secura
        };
    }

    // SI SUBE DE NIVEL → DEVUELVE OBJETO
    return {
        id: nextLevel._id,
        img: nextLevel.img.url_secura
    };
}
