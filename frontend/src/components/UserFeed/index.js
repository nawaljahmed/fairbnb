import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../HomeFeed/HomeFeed.css';

function UserFeed() {
  const sessionUser = useSelector((state) => state.session.user);
  const allStories = useSelector((state) => state.stories);
  const storiesArr = Object.values(allStories);
  const recStories = storiesArr.filter(
    (story) => story.authorId !== sessionUser.id
  );

  if (recStories.length) {
    return (
      <>
        <p id='about'>LISTINGS HERE</p>
        {/* <ul className='unorderedList'>
          {recStories.map((story) => {
            return (
              <li key={story.id} className='allStories'>
                <div className='story-container'>
                  <div className='imgDiv'>
                    <NavLink className='story-link' to={`/photos/${story.id}`}>
                      <img id='imgThumbnail' src={story.imageUrl} />
                    </NavLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul> */}
      </>
    );
  }
}

export default UserFeed;