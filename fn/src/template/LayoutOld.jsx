import React, { Children } from 'react';
export default function Layout({ children }) {
  return (
    <>
      <div id='root'>
        <aside id='aside'>
          <nav id='sidebar'>
            <ul>
              <li>
                <i className='fa fa-home'></i>
              </li>
            </ul>
          </nav>
        </aside>
        <article id='wrapper'>{children}</article>
      </div>
    </>
  );
}
