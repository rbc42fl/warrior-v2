import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// import { MdLocationOn } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

/////////////////////////////////////////////

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[400px] w-full cover  hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <p className="font-semibold m-0 text-xl ">{listing.name}</p>
          <p className="font-semibold m-0 text-xl ">
            book: &nbsp; {listing.book}
          </p>
          <p className="font-semibold m-0 text-xl ">
            chapter:&nbsp;
            {listing.chapter}
          </p>
          <p className="font-semibold m-0 text-xl">
            verse:&nbsp;{listing.verse}
          </p>
          <p className="font-semibold m-0 text-xl">
            verse:&nbsp;{listing.verse1}
          </p>
          <p className="font-semibold m-0 text-xl">
            {' '}
            verse:&nbsp;{listing.verse2}
          </p>
          <p className="font-semibold m-0 text-xl truncate mb-4">
            message:&nbsp;{listing.message}
          </p>
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(listing.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
}
