import axios from "axios";
const baseUrl = 'http://localhost:3001/orders'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getLastOrder = async () => {
  const response = await axios.get(`${baseUrl}/?_sort=-id&_page=1&_per_page=1`)
  return response.data.data[0]
}

const create = async (newOrder) => {
  const res = await axios.post(baseUrl, newOrder);
  return res.data;
};

const update = async (updatedOrder) => {
  const res = await axios.put(`${baseUrl}/${updatedOrder.id}`, updatedOrder);
  return res.data;
};

/*
const createNew = async (object) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const remove = async (anecdoteId) => {
  const response = await fetch(`${baseUrl}/${anecdoteId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error('Failed to delete anecdote')
  }
}
  */

export default { getAll, get, getLastOrder, update, create }