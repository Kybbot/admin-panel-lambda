const transformToDateFromTime = (time) => {
	const date = new Date(time);
	const day = date.getDay();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const transformedDate = `${day}.${month}.${year}`;

	return transformedDate;
};

export default transformToDateFromTime;
