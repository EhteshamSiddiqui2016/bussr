"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const { ApplicationError } = require('../../utils/error');
class BaseRepository {
    constructor() {
        this.create = (ModelSchema, ModelData) => __awaiter(this, void 0, void 0, function* () {
            try {
                return new ModelSchema(ModelData).save();
            }
            catch (error) {
                throw new ApplicationError(500, error.message);
            }
        });
        this.update = (Model, modelId, updateObj) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Model.findOneAndUpdate({ _id: modelId }, updateObj, {
                    runValidators: true,
                    new: true
                }).orFail();
            }
            catch (error) {
                if (error && error.name === 'DocumentNotFoundError') {
                    throw new ApplicationError(404, error.message);
                }
                else if (error && error.name === 'CastError') {
                    throw new ApplicationError(400, error.message);
                }
                else {
                    throw new ApplicationError(500, error.message);
                }
            }
        });
        this.deleteOneById = (ModelSchema, deleteById) => __awaiter(this, void 0, void 0, function* () {
            try {
                return ModelSchema.deleteOne({ _id: deleteById });
            }
            catch (error) {
                throw new ApplicationError(500, error.message);
            }
        });
        this.findById = (Model, modelId, selectUnselectProperty) => __awaiter(this, void 0, void 0, function* () {
            try {
                return Model.findOne({ _id: modelId })
                    .select(selectUnselectProperty)
                    .lean();
            }
            catch (error) {
                throw new ApplicationError(500, error.message);
            }
        });
        this.findByQuery = (Model, query, selectUnselectProperty) => __awaiter(this, void 0, void 0, function* () {
            try {
                return Model.find(query)
                    .select(selectUnselectProperty)
                    .lean();
            }
            catch (error) {
                throw new ApplicationError(500, error.message);
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map