import { LevelService } from "../../../Leves/app/services/Level.service";
import { ILevesRepo } from "../../../Leves/domain/ports/levelPorts";
import { LevelMongoRepository } from "../../../Leves/infrastructure/Level.mongoRepository";
import { FindAndDeleteUser } from "../../../userService/application/service/FindAndDelete.service";
import { UpdateUSer } from "../../../userService/application/service/UpdateUser.Service";
import { AuthUserRepository } from "../../../userService/domain/ports/AuthUserRepository";
import { FindAndDeleteRepo } from "../../../userService/domain/ports/FindAndDeleteRepo";
import { UpdateUSerRepository } from "../../../userService/domain/ports/UpdateUserRepository";
import { AuthMongoRepostitory, findAndDeleteMongo, UniqueUsernameRepository, UpdateUSerMongo } from "../../../userService/infrastructure/userRespositoryMongo";

const levelMongo: ILevesRepo = new LevelMongoRepository();
const levelControllers = new LevelService(levelMongo);
const findAndDeleteUser: FindAndDeleteRepo = new findAndDeleteMongo();
const findAndDelService: FindAndDeleteUser = new FindAndDeleteUser(findAndDeleteUser);





export async function selecLevel(id: string) {
    // Buscar usuario
    const userFind = await findAndDelService.findByID(id);
    if (!userFind) return null;

    const currentLevelId = userFind.level;

    const currentLevel = await levelControllers.findLevelByID(currentLevelId);
    if (!currentLevel) return currentLevelId;

    if (userFind.point < currentLevel.maxPoint) {
        return currentLevelId;
    }

    const nextLevelNumber = currentLevel.level + 1;
    const nextLevel = await levelControllers.findLevel(nextLevelNumber);

    if (!nextLevel) {
        return currentLevelId;
    }

    return nextLevel._id;
}
