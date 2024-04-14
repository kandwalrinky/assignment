import { UserModel } from "../model/UserModel";
import { countObject } from "../helper/basic";

class UserService {
    DEFAULT_FIELDS: string = 'firstName lastName email password mobile address';
    constructor() { }

    async save(data: any) {
        const doc = new UserModel(data);
        try {
            await doc.save();
            return doc;
        } catch (e) {
            return false;
        }
    }


    async findRow(conditions: any = [], fields: string = '') {

        if (countObject(conditions) == 0)
            return false;

        if (fields == '')
            fields = this.DEFAULT_FIELDS;

        try {
            const record = await UserModel.findOne(conditions)
                .select(fields)
                .lean();

            return record;
        } catch (e) {
            return false;
        }
    }

    async findAll(condition: any = {}, fields: any = '') {

        try {

            const limit = condition.limit || 5;
            const page = condition.page || 1;
            const offset = (page - 1) * condition['limit'];

            const record =
                await UserModel.find()
                    .limit(limit)
                    .skip(offset)
                    .sort('createdAt')
                    .select(fields || this.DEFAULT_FIELDS)
                    .lean();

            if (countObject(record) > 0)
                return { count: countObject(record), record: record };
            else
                return false;

        } catch (e) {
            return false;
        }
    }

    async update(id: string, data: any) {
        try {

            const update = await UserModel.findByIdAndUpdate(id, data, {
                new: true
            });
            return update;
        } catch (e) {
            //console.log('update error');
            return false;
        }
    }

    async countRecords(condition: any = {}) {
        try {
            const record = await UserModel.countDocuments(condition).exec();
            return record;
        } catch (e) {
            return 0;
        }
    }


    async find(params: any = {}, fields: any = '') {

        if (fields == '')
            fields = this.DEFAULT_FIELDS;
        try {

            const conditions: any = {};
            let filter: any = {};

            if (params.firstName)
                conditions.firstName = params.firstName;

            if (params.lastName)
                conditions.lastName = params.lastName;

            if (params.email)
                conditions.email = params.email;

            if (params.mobile)
                conditions.mobile = params.mobile;

            filter['limit'] = params.limit || 5;
            const page = params.page || 1;
            const offset = (page - 1) * filter['limit'];
            filter['offset'] = offset;

            const count = await this.countRecords(conditions);
            const record = await UserModel.find(conditions)
                .limit(filter.limit)
                .skip(filter.offset)
                .sort('-createdAt')
                .select(fields || this.DEFAULT_FIELDS)
                .lean();

            return { count: count, record: record };

        } catch (e) {
            return { record: {}, count: 0 };
        }
    }



}

export const userService = new UserService();