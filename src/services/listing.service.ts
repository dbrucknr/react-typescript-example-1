import http from "../http-common";
import ListingData from "../types/listing.type";

class ListingDataService {
    getAll() {
        return http.get("/listings")
    }

    deleteAll() {
        return http.delete("/listings")
    }

    get(id: string) {
        return http.get(`/listings/${ id }`)
    }

    create(data: ListingData) {
        return http.post("/listings", data)
    }

    update(data: ListingData, id:string) {
        return http.put(`/listings/${ id }`, data)
    }

    delete(id: string) {
        return http.delete(`/listings/${ id }`)
    }
}

export default new ListingDataService()
