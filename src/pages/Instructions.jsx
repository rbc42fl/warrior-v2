import React from 'react';
// import { Link } from 'react-router-dom';
export default function Instructions() {
  return (
    <>
      <div>
        <h1 className="text-center">Instructions</h1>
        <p className="font-bold px-3 pb-2">
          The following instructions are on how to use this web site!
        </p>
        <ul className="px-3">
          <li className="pb-2">
            1. First chose whether it is from the old or new testament.
          </li>
          <li className="pb-2">2. Enter your name.</li>
          <li className="pb-2">3. Enter the chapter you are in.</li>
          <li className="pb-2">
            {' '}
            4. Enter the verse or verse range you are discussing.{' '}
          </li>
          <li className="pb-2">
            5. Chose at least three key words in the passage.{' '}
          </li>

          <li className="pb-2">
            6. Type or copy the verse or verses into the Scripture text area.
          </li>

          <li className="pb-2">
            7. Record your own personal reflections and application from the
            verse.
          </li>

          <li className="pb-2">
            9. Find and up load a photo that describes the message or you can
            have one photo that you use all the time and let it be your tag
            photo. I have included a link to the unSplash web site where you can
            find all kinds of free photos. Photo size cannot be more that 2meg.
            There are download options with each photo on unSplash.
          </li>
        </ul>
      </div>
      <div className="instructions">
        <div className=" ">
          <h4 className="pl-10 pb-3 font-bold">A helpful list of resources</h4>
          <ul className="pl-10">
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://www.everymanawarrior.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Every Man A Warrior
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://unsplash.com/images"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash free photos
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href=" https://www.gotquestions.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Got Questions
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://mensdiscipleshipnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mem's discipleship network
              </a>
            </li>
          </ul>
          <p className="pl-10">Some of the photos come from unsplash.com</p>
        </div>
      </div>
    </>
  );
}
