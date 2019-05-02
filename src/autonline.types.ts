export interface Car {
    _id: String;
    brand: String;
    model: String;
    year: Number;
    fuelType: Number;
    transmissionType: Number;
    chassisType: Number;
    description: String;
    telephone: String;
    picture: [String];
    city: String;
    updatedDate: Date;
    price: Number;
    clearAll():void;
}
export let carWrapper = {
    _id: undefined,
    brand: undefined,
    model: undefined,
    year: undefined,
    fuelType: undefined,
    transmissionType: undefined,
    chassisType: undefined,
    description: undefined,
    telephone: undefined,
    picture: undefined,
    city: undefined,
    updatedDate: undefined,
    price: undefined,
    clearAll: function():void {
        this._id = undefined;
        this.brand = undefined;
        this.model = undefined;
        this.year = undefined;
        this.fuelType = undefined;
        this.transmissionType = undefined;
        this.chassisType = undefined;
        this.description = undefined;
        this.telephone = undefined;
        this.picture = undefined;
        this.city = undefined;
        this.updatedDate = undefined;
    }
};

export let carWrapper2 = {
    _id: undefined,
    brand: undefined,
    model: undefined,
    year: undefined,
    fuelType: undefined,
    transmissionType: undefined,
    chassisType: undefined,
    description: undefined,
    telephone: undefined,
    picture: undefined,
    city: undefined,
    updatedDate: undefined,
    price: undefined,
    clearAll: function():void {
        this._id = undefined;
        this.brand = undefined;
        this.model = undefined;
        this.year = undefined;
        this.fuelType = undefined;
        this.transmissionType = undefined;
        this.chassisType = undefined;
        this.description = undefined;
        this.telephone = undefined;
        this.picture = undefined;
        this.city = undefined;
        this.updatedDate = undefined;
    }
};
