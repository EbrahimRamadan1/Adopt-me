import { useQuery } from 'react-query';
const fetchPet = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);
  return res.json();
};
const usePet = (petId) => {
  return useQuery(['pet', petId], fetchPet);
};
export default usePet;
