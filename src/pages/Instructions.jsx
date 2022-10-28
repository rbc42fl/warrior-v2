import React from 'react';

export default function Instructions() {
  return (
    <>
      <div>
        <h1 className="text-center">Instructions</h1>
        <p className="px-3">
          The following instructions on how to have a quiet time come from the
          Every man A Warrior website. I have left out some of the information,
          but you can goto their web site and look in the resources for the
          complete quiet time form.
        </p>
        <ul>
          <li>
            1. First read the passage, while asking the Holy Spirit to reveal it
            to your.
          </li>
          <li>
            2. Find the verse that really speaks to you. You can enter two
            verses. But you can mention any other verses in the textarea below.
            .
          </li>
          <li>3. Determine if there is a command to obey?</li>
          <li> 4. Is there a promise to claim?</li>
          <li>5. Is there a sin to avoid?</li>

          <li>
            6. Determine a least three key words that stick with you from the
            reading.
          </li>
          <li>7. Look for the main scriptural message in the verse.</li>
          <li>
            8. Record your own personal reflections and application from the
            verse.
          </li>
          <li>
            9. Find and up load a photo or two (max of 6) that describes the
            message. You can have one photo that you use all the time and let it
            be your tag photo. Max photo size cannot total more that 2meg.
            Photos prepped for the internet are best.
          </li>
        </ul>
      </div>
      <div className="instructions">
        <div className=" ">
          <h4 className="pl-10">A helpful list of resources</h4>
          <ul className="pl-10">
            <li>
              <a
                href="https://www.everymanawarrior.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Every Man A Warrior
              </a>
            </li>
            <li>
              <a
                href="https://unsplash.com/images"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash free photos
              </a>
            </li>

            <a
              href=" https://www.gotquestions.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Got Questions
            </a>
            <li>
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
