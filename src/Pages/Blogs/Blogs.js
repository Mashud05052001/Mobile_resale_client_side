import React from 'react';

const Blogs = () => {
    return (
        <div className='max-w-screen-xl mx-auto mt-12 border-2 rounded-xl'>
            <div className="collapse collapse-arrow rounded-t-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/70 font-semibold text-xl ">
                    Q. &nbsp; What are the different ways to manage a state in a React application?
                </div>
                <div className="collapse-content bg-primary/30 ">
                    <p className='pt-3'>
                        There are 4 ways available to manage the state in out react website. Local, Global, Server & URL state. Local state is most often managed in React using the useState hook. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.URL state is often missing as a category of state, but it is an important one.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/70 font-semibold text-xl ">
                    Q. &nbsp; How does prototypical inheritance work?
                </div>
                <div className="collapse-content bg-primary/30">
                    <p className='pt-3'>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object.getPrototypeOf and Object.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/70 font-semibold text-xl ">
                    Q. &nbsp; React vs. Angular vs. Vue?
                </div>
                <div className="collapse-content bg-primary/30">
                    <p className='pt-3'>
                        React offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. However, learning to use React does not necessarily mean that you are using the best practices.Angular has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works.
                    </p>
                </div>
            </div>
            <div className="collapse collapse-arrow rounded-b-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary/70 font-semibold text-xl ">
                    Q. &nbsp; How does NodeJS handle multiple requests at the same time?
                </div>
                <div className="collapse-content bg-primary/30">
                    <p className='pt-3'>
                        NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them. EventLoop is the listener for the EventQueue.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blogs;