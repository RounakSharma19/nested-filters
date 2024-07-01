import { TFilterCategory } from "../interfaces";

export const mockFetchFilters = async (): Promise<Array<TFilterCategory>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Collection",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 1, name: "Collection 1" },
            { id: 2, name: "Collection 2" },
          ],
        },
        {
          id: 2,
          name: "Created by",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 3, name: "Shuchit" },
            { id: 4, name: "John Doe" },
          ],
        },
        {
          id: 3,
          name: "Academy",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 5, name: "Lyearn" },
            { id: 6, name: "Udemy" },
          ],
        },
        {
          id: 4,
          name: "Content tags",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 7, name: "JavaScript" },
            { id: 8, name: "React" },
          ],
        },
      ]);
    }, 500);
  });
};
