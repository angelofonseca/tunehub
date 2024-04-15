import { Link } from 'react-router-dom';
import { AlbumCardType } from '../../types';
import './SearchCard.css';

function SearchCard({ ...props }: AlbumCardType) {
  const { artistName, collectionId, collectionName, artworkUrl100 } = props;
  return (
    <div className="card">
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img
          src={ artworkUrl100 }
          className="card-img-top"
          alt={ `Álbum ${collectionName}` }
        />
      </Link>
      <div className="card-body">
        <h6 className="card-title" data-testid="album-name">{collectionName}</h6>
        <p className="card-text" data-testid="artist-name">{artistName}</p>
      </div>
    </div>
  );
}

export default SearchCard;
