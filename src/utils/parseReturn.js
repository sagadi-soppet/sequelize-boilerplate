module.export = (data, error = undefined) => {
	return {
		success: data ? true : false,
		data: data ? data : undefined,
		error: data
			? undefined
			: {
					message: error,
				},
	};
};
