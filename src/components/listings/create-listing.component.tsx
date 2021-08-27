import { Component, ChangeEvent } from "react";
import ListingDataService from "../../services/listing.service";
import ListingData from "../../types/listing.type";

type Props = {};
type State = ListingData & { submitted: boolean };

export default class CreateListing extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveListing = this.saveListing.bind(this);
        this.newListing = this.newListing.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            submitted: false
        };
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ title: e.target.value });
    };
    
    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ description: e.target.value });
    };

    async saveListing() {
        const listing: ListingData = {
            title: this.state.title,
            description: this.state.description
        };
        try {
            const response = await ListingDataService.create(listing);
            if (response.status !== 200) {
                console.error('An error has occurred');
            }
            const { id, title, description } = response.data;
            this.setState({
                id: id,
                title: title,
                description: description,
                submitted: true
            });
        } catch (error) {
            console.error('A System error has occurred', error)
        }
    };

    newListing() {
        this.setState({
            id: null,
            title: "",
            description: "",
            submitted: false
        });
    };

    render() {
        const { title, description, submitted } = this.state;
        return (
            <div className="submit-form">
                {
                    submitted ? (
                        <div>
                            <h4>Listing Submitted Successfully</h4>
                            <button className="btn btn-success" onClick={this.newListing}>
                                Create Another Listing
                            </button>
                        </div>
                    ) : (
                        <div>
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={title}
                            onChange={this.onChangeTitle}
                            name="title"
                          />
                        </div>
            
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={description}
                            onChange={this.onChangeDescription}
                            name="description"
                          />
                        </div>
            
                        <button onClick={this.saveListing} className="btn btn-success">
                          Submit
                        </button>
                      </div>
                    )
                }
            </div>
        )
    }
}