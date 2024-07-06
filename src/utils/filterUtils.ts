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
            { id: 3, name: "Collection 3" },
            { id: 4, name: "Collection 4" },
            { id: 5, name: "Collection 5" },
            { id: 6, name: "Collection 6" },
            { id: 7, name: "Collection 7" },
            { id: 8, name: "Collection 8" },
            { id: 9, name: "Collection 9" },
            { id: 10, name: "Collection 10" },
          ],
        },
        {
          id: 2,
          name: "Created by",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 1, name: "Shuchit" },
            { id: 2, name: "John Doe" },
            { id: 3, name: " Doe" },
            { id: 4, name: "rounak " },
            { id: 5, name: "suhail" },
            { id: 6, name: "ritika" },
            { id: 7, name: "priyanka" },
            { id: 8, name: "shubham" },
            { id: 9, name: "sandeep" },
            { id: 10, name: "rahul" },
            { id: 11, name: "akshay" },
            { id: 12, name: "reshma" },
            { id: 13, name: "divya" },
            { id: 14, name: "abhi" },
            { id: 15, name: "abhi" },
            { id: 16, name: "abhi" },
            { id: 17, name: "abhi" },
            { id: 18, name: "abhi" },
            { id: 19, name: "abhi" },
            { id: 20, name: "abhi" },
            { id: 21, name: "abhi" },
            { id: 22, name: "abhi" },
            { id: 23, name: "abhi" },
            { id: 24, name: "abhi" },
            { id: 25, name: "abhi" },
          ],
        },
        {
          id: 3,
          name: "Academy",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 1, name: "Lyearn" },
            { id: 2, name: "Udemy" },
            { id: 3, name: "motion" },
            { id: 4, name: "education" },
            { id: 5, name: "byjus" },
            { id: 6, name: "pw" },
            { id: 7, name: "vidyapeet" },
            { id: 8, name: "vidyapeet" },
            { id: 9, name: "vidyapeet" },
            { id: 10, name: "vidyapeet" },
          ],
        },
        {
          id: 4,
          name: "Content tags",
          dummyIcon:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
          options: [
            { id: 1, name: "JavaScript" },
            { id: 2, name: "React" },
            { id: 3, name: "typrscript" },
            { id: 4, name: "java" },
            { id: 5, name: "python" },
            { id: 6, name: "next" },
            { id: 7, name: "vue" },
            { id: 8, name: "angular" },
            { id: 9, name: "flutter" },
            { id: 10, name: "react native" },
            { id: 11, name: "dart" },
          ],
        },
      ]);
    }, 500);
  });
};
