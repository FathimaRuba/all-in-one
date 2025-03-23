import base_url from "./base_url";  
import commonApi from "./commonApi";

export const addCategory = async (data,headers) => {
        const response = await commonApi(`${base_url}/categories`, 'POST',headers, data);
        return response; 
};

export const getCategory = async (headers) => {
    return await commonApi(`${base_url}/getcat`, 'GET',headers, "");
}

export const getServiceProviderByCat = async(headers,category) => {
    return await commonApi(`${base_url}/servicers/${category}`,'GET',headers,"")
}

export const addComplaint = async (data,headers) => {
    return await commonApi(`${base_url}/complaints`, 'POST',headers, data);
}

export const replyComplaint = async (id, data, headers) => {
    return await commonApi(`${base_url}/reply/${id}`, 'PUT', headers, data);
};

export const getComplaint = async (headers) => {
    return await commonApi(`${base_url}/getallcomp`, 'GET', headers, "");
}

export const getComplaintsById = async (headers) => {
    return await commonApi(`${base_url}/getcomp`, 'GET', headers, "");
}

export const delCategory = async (id) => {
    return await commonApi(`${base_url}/delcat/${id}`, 'DELETE', "",{});
}

export const registerApi = async (data) => {
    return await commonApi(`${base_url}/reg`, 'POST', "", data)
}

export const getServiceProviders = async (headers) => {
    return await commonApi(`${base_url}/servicers`, 'GET',headers, "");
}

export const getAllServiceProviders = async (headers) => {
    return await commonApi(`${base_url}/service`, 'GET',headers, "");
}

export const getServiceProviderById = async (id,headers) => {
    return await commonApi(`${base_url}/servicer/${id}`, 'GET',headers, "");
}

export const getUsers = async() => {
    return await commonApi(`${base_url}/users`,'GET',"","")
}

export const deleteUser = async(id) => {
    return await commonApi(`${base_url}/deluser/${id}`,'DELETE',"",{})
}

export const updateServiceProviderStatus = async (id, status) => {
    return await commonApi(`${base_url}/updatestat`, 'POST', "", { id, status })
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/log`, 'POST',"", data);
}

export const profileUpdate = async(data,headers) => {
    return await commonApi(`${base_url}/serviceprofile`,'PUT',headers,data)
}

export const addRatFeed = async(data,headers) => {
    return await commonApi(`${base_url}/addratfeed`,'POST',headers,data)
}

export const getRatFeed = async(headers,id) => {
    return await commonApi(`${base_url}/getratfeed/${id}`,'GET',headers,'')
}

export const getAllRatFeed = async(headers) => {
    return await commonApi(`${base_url}/getallratfeed`,'GET',headers,'')
}

export const getAllRatFeeds = async(headers) => {
    return await commonApi(`${base_url}/getallratfeeds`,'GET',headers,'')
}

export const addBooking = async(data,headers) => {
    return await commonApi(`${base_url}/addbooking`,'POST',headers,data)
}

export const getUserBooking = async(headers) => {
    return await commonApi(`${base_url}/getuserbook`,'GET',headers,"")
}

export const getSpBooking = async(headers) => {
    return await commonApi(`${base_url}/getspbook`,'GET',headers,"")
}

export const acceptBookingRequest = async (bookingId, headers) => {
    return await commonApi(`${base_url}/acceptrequest/${bookingId}`, 'PUT', headers, '');
};

export const rejectBookingRequest = async (bookingId, headers) => {
    return await commonApi(`${base_url}/rejectrequest/${bookingId}`, 'PUT', headers, '');
};

export const updateBookingStatus = async (id, status,headers) => {
    return await commonApi(`${base_url}/updatebookstat`, 'POST',headers, { id, status })
}

export const updateBookingAmount = async (id, data,headers) => {
    return await commonApi(`${base_url}/updatebookamt/${id}`, 'PUT',headers,data)
}
export const deleteBooking = async (id,headers) => {
    return await commonApi(`${base_url}/delbook/${id}`,'DELETE',headers,{})
}

export const getacceptedWorks = async(headers) => {
    return await commonApi(`${base_url}/getworks`,'GET',headers,"")
}

export const getCompletedWorks = async(headers) => {
    return await commonApi(`${base_url}/compworks`,'GET',headers,"")
}

export const createOrder = async (amount, headers) => {
    return await commonApi(`${base_url}/create-order`, 'POST', headers, { amount });
};

export const capturePayment = async (paymentId, orderId, signature, headers) => {
    return await commonApi(`${base_url}/capture-payment`, 'POST', headers, { paymentId, orderId, signature });
};
