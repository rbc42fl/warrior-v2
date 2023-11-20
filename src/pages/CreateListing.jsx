import { useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './CreateListing.module.css';
export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'old',
    name: '',
    book: '',
    chapter: '',
    verse: '',
    // verse1: '',
    // verse2: '',

    // command: '',
    keyword_1: '',
    keyword_2: '',
    keyword_3: '',
    // promise: '',
    // sin: '',
    message: '',
    reflections: '',

    images: {}
  });
  const {
    type,
    name,
    book,
    chapter,
    verse,
    // verse1,
    // verse2,
    // command,
    keyword_1,
    keyword_2,
    keyword_3,
    // promise,
    // sin,
    reflections,
    message,
    images
  } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        images: e.target.files
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (images.length > 1) {
      setLoading(false);
      toast.error('maximum 1 images are allowed');
      return;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          snapshot => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          error => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map(image => storeImage(image))
    ).catch(error => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,

      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    setLoading(false);
    toast.success('Listing created');
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className={styles.container}>
      <div>
        <h2 className={styles.create_posting_header}>
          Before starting, please read the instructions in the instructions
          page.
        </h2>
      </div>
      <form className="mx-auto w-full" onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Old / New</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="old"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === 'new' ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
          >
            Old
          </button>
          <button
            type="button"
            id="type"
            value="new"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded-lg hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === 'old' ? 'bg-white text-black' : 'bg-slate-600 text-white'
            }`}
          >
            New
          </button>
        </div>
        <div className="">
          <p className="text-lg mt-6 font-semibold">Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            maxLength="32"
            minLength="10"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 "
          />
        </div>
        <div className="flex flex-col  mb-6">
          <div>
            <p className="text-lg font-semibold">
              Which Book are you studying in?
            </p>
            <input
              type="text"
              id="book"
              value={book}
              onChange={onChange}
              placeholder="Book"
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Which Chapter are you in?</p>
            <input
              type="number"
              id="chapter"
              value={chapter}
              onChange={onChange}
              min="1"
              max="250"
              placeholder="Chapter"
              required
              className="w-1/2 px-4 py-2 mb-4 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
            />
            <div className="flex">
              <div className="flex flex-col w-60">
                <p className="text-lg font-semibold ">
                  What is The Verse Range?
                </p>
                <input
                  type="text"
                  id="verse"
                  value={verse}
                  onChange={onChange}
                  min="1"
                  max="250"
                  // required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
                />
              </div>
              {/* <div className="flex flex-col w-60">
                <p className="text-lg font-semibold">Verse</p>
                <input
                  type="number"
                  id="verse1"
                  value={verse1}
                  onChange={onChange}
                  min="1"
                  max="250"
                  // required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
                />
              </div> */}
              {/* <div className="flex flex-col w-60">
                <p className="text-lg font-semibold">Verse</p>
                <input
                  type="number"
                  id="verse2"
                  value={verse2}
                  onChange={onChange}
                  min="1"
                  max="250"
                  // required
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 "
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* <p className="text-lg mt-3 font-semibold">Is there a Command?</p>

          <textarea
            type="text"
            id="command"
            value={command}
            onChange={onChange}
            placeholder="Command"
            required
            className="w-full px-1 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2"
          /> */}

          {/* <p className="text-lg mt-3 font-semibold">Is there a Promise?</p>

          <textarea
            type="text"
            id="promise"
            value={promise}
            onChange={onChange}
            placeholder=" Is There a Promise"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-3"
          /> */}
          {/* <p className="text-lg mt-3 font-semibold">Is there a sin to avoid?</p>

          <textarea
            type="text"
            id="sin"
            value={sin}
            onChange={onChange}
            placeholder="Sin to avoid"
            required
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-3"
          /> */}
          <div className="flex max-h-28">
            <div className="flex flex-col mr-3 ">
              <p className="text-lg font-semibold">Key Word</p>
              <textarea
                type="text"
                id="keyword_1"
                value={keyword_1}
                onChange={onChange}
                placeholder="Key"
                min="1"
                max="50"
                // required
                className="w-full h-28 px1 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
              />
            </div>
            <div className="flex flex-col mr-3">
              <p className="text-lg font-semibold">Key Word</p>
              <textarea
                type="text"
                id="keyword_2"
                value={keyword_2}
                onChange={onChange}
                placeholder="Key"
                // required
                className="w-full px-1 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Key Word</p>
              <textarea
                type="text"
                id="keyword_3"
                value={keyword_3}
                onChange={onChange}
                placeholder="Key"
                // required
                className="w-full px-1 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-lg mt-6 font-semibold">
              Enter Verse or Verses Here.
            </p>
            <textarea
              type="text"
              id="message"
              value={message}
              onChange={onChange}
              placeholder=" Scriptural Message"
              required
              className="w-full h-36 px-1s py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg  focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-3"
            />
          </div>

          <div>
            <p className="text-lg mt-6 font-semibold">
              Your Personal Reflections
            </p>
            <textarea
              type="text"
              id="reflections"
              value={reflections}
              onChange={onChange}
              placeholder="Reflections"
              required
              className="w-full h-36 px-1 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">Add your image!</p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
          <p> value={book}</p>
        </div>

        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create New Posting
        </button>
      </form>
    </main>
  );
}
