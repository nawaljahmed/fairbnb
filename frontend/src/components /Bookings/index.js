import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBooking,
  updateBooking,
  deleteBooking,
} from '../../store/bookings';
import './Bookings.css';
import { FaEdit, FaUserCircle, FaTrashAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { BiSave } from 'react-icons/bi';
import { MdSend } from 'react-icons/md';

function Bookings() {
  const { storyId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const stories = useSelector((state) => state.stories);
  const storiesArr = Object.values(stories);
  let story;
  if (sessionUser) {
    story = storiesArr.filter((story) => story.authorId === sessionUser.id);
  }

  const bookings = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(bookings);
  const storyBookings = bookingsArr.filter(
    (booking) => booking.storyId === Number(storyId)
  );

  const dayjs = require('dayjs');

  const currentStory = useSelector((state) => state.stories[storyId]);

  // console.log('storyPrice is', currentStory.price)

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);

  const [listingFirstImageUrl, setListingFirstImageUrl] = useState('');
  const [listingPricePerNight, setListingPricePerNight] = useState('');
  const [listingCity, setListingCity] = useState('');
  const [listingLat, setListingLat] = useState('');
  const [listingLng, setListingLng] = useState('');



  const [errors, setErrors] = useState([]);
  let newObj = {};
  for (const booking of bookingsArr) {
    newObj[booking.id] = false;
  }

  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');


  const [editDays, setEditDays] = useState('');
  const [editTotal, setEditTotal] = useState('');

  const [editErrors, setEditErrors] = useState([]);
  const [showEditBox, setshowEditBox] = useState(false);
  const [showBookingId, setshowBookingId] = useState(null);
  const [showEditBoxArr, setEditBoxArr] = useState(newObj);

  //handles an edited booking submission
  const handleEdit = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id;

    const editedBooking = {
      id: showBookingId,
      userId,
      storyId: Number(storyId),
      startDate: editStartDate,
      endDate: editEndDate,
      days: -1 * dayjs(editStartDate).diff(dayjs(editEndDate), 'day'),
      total: -1 *dayjs(editStartDate).diff(dayjs(editEndDate), 'day') * currentStory.price,
    };

    setshowEditBox(false);
    setshowBookingId(null);

    return dispatch(updateBooking(editedBooking))
      .then(() => {
        setStartDate('');
        setEndDate('');
        setDays('');
        setTotal('');
        setEditErrors([]);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setEditErrors(data.errors);
      });
  };

  //handles new booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionUser.id;

    const newBooking = {
      userId,
      storyId: Number(storyId),
      startDate,
      endDate,
      days: -1 * dayjs(startDate).diff(dayjs(endDate), 'day'),
      total: -1 *dayjs(startDate).diff(dayjs(endDate), 'day') * currentStory.price,
      listingFirstImageUrl: currentStory.imageUrl[0],
      listingPricePerNight: currentStory.price,
      listingPricePerNight: currentStory.price,
      listingCity: currentStory.city,
      listingLat: currentStory.lat,
      listingLng: currentStory.lng,
    };

    return dispatch(createBooking(newBooking))
      .then(() => {
        setStartDate('');
        setEndDate('');
        setDays('');
        setTotal('');
        setListingFirstImageUrl('');
        setListingPricePerNight('');
        setListingCity('');
        setListingLat('');
        setListingLng('');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      {sessionUser && story.authorId !== sessionUser.id && (
        <div className='bookingsInputBox'>
          <div className='bookingsInputBox__outer'>
            <div className='bookingsInputBox__inner'>
              <form id='bookings-form-send' onSubmit={handleSubmit}>
                <ul className='ws-errors'>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <div className='dateInputFields'>
                  <div className='startingDate'>
                    <label>CHECK-IN:</label>
                    <input
                      // className='ic-field'
                      id='startingDateInputBox'
                      type='date'
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className='endingDate'>
                    <label>CHECKOUT:</label>
                    <input
                      // className='ic-field'
                      id='endingDateInputBox'
                      type='date'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='daysAndTotal'>
                  <div className='daysAndTotalNumber'>
                    Days:{' '}
                    {Number.isNaN(
                      -1 * dayjs(startDate).diff(dayjs(endDate), 'day')
                    )
                      ? '0'
                      : -1 * dayjs(startDate).diff(dayjs(endDate), 'day')}
                  </div>
                  <div className='daysAndTotalNumber'>
                    <strong>Total:</strong> $
                    {Number.isNaN(
                      -1 * dayjs(startDate).diff(dayjs(endDate), 'day')
                    ) * currentStory.price
                      ? '0'
                      : -1 *
                        dayjs(startDate).diff(dayjs(endDate), 'day') *
                        currentStory.price}
                  </div>
                </div>
                <button
                  type='submit'
                  className='my-5 btn neumorphicReserve-btn'
                  id='reserveButton'
                >
                  Reserve
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Bookings;
