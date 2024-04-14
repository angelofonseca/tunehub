import { Link } from "react-router-dom";
import { AlbumCardType } from "../../types";
import './SearchCard.css'

function SearchCard({ artistName, collectionId, collectionName, artworkUrl100 }: AlbumCardType) {
    return (
        <div className="card">
            <Link
                to={`/album/${collectionId}`}
                data-testid={`link-to-album-${collectionId}`}
            >
                <img src={artworkUrl100} className="card-img-top" alt={`Álbum ${collectionName}`} />
            </Link>
            <div className="card-body">
                <h6 className="card-title">{collectionName}</h6>
                <p className="card-text">{artistName}</p>
            </div>
        </div>
    )
}

export default SearchCard;