import { Component, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ListingDataService from "../../services/listing.service";
import ListingData from "../../types/listing.type";

type Props = {};
type State = {
    listings: Array<ListingData>,
    currentListing: ListingData | null,
    currentIndex: number,
    searchQuery: string
};

export default class AllListings extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.retrieveListings = this.retrieveListings.bind(this);
        this.refresh = this.refresh.bind(this);
        this.setActiveListing = this.setActiveListing.bind(this);
        this.removeAllListings = this.removeAllListings.bind(this);
        this.searchQuery = this.searchQuery.bind(this);

        this.state = {
            listings: [],
            currentListing: null,
            currentIndex: -1,
            searchQuery: ""
        };
    };

    componentDidMount() {
        this.retrieveListings();
    }

    async retrieveListings() {
        try {
            const response = await ListingDataService.getAll();
            if (response.status !== 200) {
                console.error('An error has occurred');
            };
            this.setState({ listings: response.data });
        } catch (error) {
            console.error('A System error has occurred', error);
        }
    }

    onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        this.setState({ searchQuery: query });
    };

    refresh() {
        this.retrieveListings();
        this.setState({
            currentListing: null,
            currentIndex: -1
        });
    }

    setActiveListing(listing: ListingData, index: number) {
        this.setState({
            currentListing: listing,
            currentIndex: index
        });
    }

    async removeAllListings() {
        try {
            const response = await ListingDataService.deleteAll();
            if (response.status !== 200) {
                console.error('An error has occurred');
            };
            this.refresh();
        } catch (error) {
            console.error('A System error has occurred', error);
        }
    }

    searchQuery() {

    }

    render() {
        const { searchQuery, listings, currentListing, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Search (not working)"
                            value={searchQuery}
                            onChange={this.onChangeSearch}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchQuery}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Listings</h4>

                    <ul className="list-group">
                        { 
                            listings && listings.map((listing: ListingData, index: number) => (
                               <li className={
                                   "list-group-item" +
                                   (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveListing(listing, index)}
                                key={index}
                               >
                                {listing.title}
                                {listing.description}
                                <Link to={"/listing/" + currentListing.id}>Edit</Link>
                               </li> 
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
