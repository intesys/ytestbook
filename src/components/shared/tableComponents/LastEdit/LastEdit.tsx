import classes from './lastEdit.module.scss'

interface IProps {
  date?: string;
}

const getTimeAgo = (dateTime: Date) => {
  const now = new Date();
  const timeDifference = now.getTime() - dateTime.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

export const LastEdit = ({ date }: IProps) => {
  if (!date) {
    return <span> - </span>;
  }

  const dateParts = date.split(/[/ :]/);
  const parsedDate = new Date(
    parseInt(dateParts[2]), // Year
    parseInt(dateParts[1]) - 1, // Months (start from 0)
    parseInt(dateParts[0]), // Day
    parseInt(dateParts[3]), // Hour
    parseInt(dateParts[4]), // Minute
  );

  return <span className={classes.text}>{getTimeAgo(parsedDate)}</span>;
};
