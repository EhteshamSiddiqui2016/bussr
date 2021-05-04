const { ApplicationError } = require('../../utils/error');
export class BaseRepository {
    constructor() { }

    public create = async (ModelSchema: any, ModelData: any): Promise<any> => {
        try {
            return new ModelSchema(ModelData).save();
        } catch (error) {
            throw new ApplicationError(500, error.message);
        }
    };

    public update = async (Model: any, modelId: string, updateObj: any): Promise<any> => {
        try {
            return await Model.findOneAndUpdate({ _id: modelId }, updateObj, {
                runValidators: true,
                new: true
            }).orFail();
        } catch (error) {
            if (error && error.name === 'DocumentNotFoundError') {
                throw new ApplicationError(404, error.message);
            } else if (error && error.name === 'CastError') {
                throw new ApplicationError(400, error.message);
            } else {
                throw new ApplicationError(500, error.message);
            }
        }
    };

    public deleteOneById = async (ModelSchema: any, deleteById: any): Promise<any> => {
        try {
            return ModelSchema.deleteOne({ _id: deleteById })
        } catch (error) {
            throw new ApplicationError(500, error.message);
        }
    };

    public findById = async (
        Model: any,
        modelId: string,
        selectUnselectProperty: string
    ): Promise<any> => {
        try {
            return Model.findOne({ _id: modelId })
                .select(selectUnselectProperty)
                .lean();
        } catch (error) {
            throw new ApplicationError(500, error.message);
        }
    };
    public findByQuery = async (
        Model: any,
        query: any,
        selectUnselectProperty: string
    ): Promise<any> => {
        try {
            return Model.find(query)
                .select(selectUnselectProperty)
                .lean();
        } catch (error) {
            throw new ApplicationError(500, error.message);
        }
    };
}
