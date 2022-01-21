import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import './HomeFeed.css';
import '../UserStories/UserStories.css';

function Home() {
  const allStories = useSelector((state) => state.stories);
  const storiesArr = Object.values(allStories);

  if (storiesArr.length) {
    return (
      <>
        <ul className='unorderedList'>
          {storiesArr.map((story) => {
            return (
              <li key={story.id} className='allStories'>
                <div className='story-container'>
                  {/* <div className='imgDiv'>
                    <NavLink className='story-link' to={`/photos/${story.id}`}>
                      <img id='imgThumbnail' src={story.imageUrl} />
                    </NavLink>
                  </div> */}
                </div>
              </li>
            )
          })}
        </ul>
      </>
    )
  } else {
    return null;
  }
}

export default Home;