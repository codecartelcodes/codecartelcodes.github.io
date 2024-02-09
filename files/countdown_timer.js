// countdown_timer.js

function calculateTimeRemaining() {
  const now = new Date();
  // Use Eastern Standard Time (EST) as the default timezone
  const targetTimezoneOffset = -5;
  // Set the meeting days to Monday, Wednesday, Friday
  const targetDays = [1, 3, 5]; 
  // Set the meeting time to 8 PM on each meeting day
  const targetHour = 20; 

  // Adjust target time to the visitor's timezone
  const targetTime = new Date();
  targetTime.setUTCHours(targetHour - targetTimezoneOffset, 0, 0, 0);

  // Calculate time difference
  const timeDifference = targetTime - now;

  // Calculate days, hours, and minutes
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}

function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  const { days, hours, minutes } = calculateTimeRemaining();

  countdownElement.innerHTML = `in ${days} days, ${hours} hours, and ${minutes} minutes`;
}

function calculateNextMeetingLocalTime() {
  const now = new Date();
  const { days, hours, minutes } = calculateTimeRemaining();

  const nextMeetingLocalTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + days,
    now.getHours() + hours,
    now.getMinutes() + minutes + 1
  );

  return {
    day_name: nextMeetingLocalTime.toLocaleDateString('en-US', { weekday: 'long' }),
    month_name: nextMeetingLocalTime.toLocaleDateString('en-US', { month: 'long' }),
    day_number: nextMeetingLocalTime.getDate(),
    year: nextMeetingLocalTime.getFullYear(),
    hour: (nextMeetingLocalTime.getHours() >=13) ? (nextMeetingLocalTime.getHours() - 12) : nextMeetingLocalTime.getHours(),
    minute: String(nextMeetingLocalTime.getMinutes()).padStart(2, '0'),
    ampm: (nextMeetingLocalTime.getHours() >= 12) ? "PM" : "AM"
  };
}

function displayNextMeetingLocalTime() {
  const meetingTimeElement = document.getElementById('meetingTime');
  const { day_name, month_name, day_number, year, hour, minute, ampm} = calculateNextMeetingLocalTime();

  meetingTimeElement.innerHTML = `${day_name}, ${month_name}, ${day_number}, ${year} at ${hour}:${minute} ${ampm}`;
}
