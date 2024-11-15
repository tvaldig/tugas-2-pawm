/* eslint-disable @next/next/no-img-element */
export const InfiniteSlider : React.FC = () => {
    return (
        <>
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
             x-data="{}"
             x-init="$nextTick(() => {
                 let ul = $refs.logos;
                 ul.insertAdjacentHTML('afterend', ul.outerHTML);
                 ul.nextSibling.setAttribute('aria-hidden', 'true');
             })">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            <li>
                <img src="./Frame 1.png" alt="Frame 1" />
            </li>
            <li>
                <img src="./Frame 2.png" alt="Frame 2" />
            </li>
            <li>
                <img src="./Frame 3.png" alt="Frame 3" />
            </li>
            <li>
                <img src="./Frame 4.png" alt="Frame 4" />
            </li>
            <li>
                <img src="./Frame 5.png" alt="Frame 5" />
            </li>
            <li>
                <img src="./Frame 6.png" alt="Frame 6" />
            </li>
            <li>
                <img src="./Frame 7.png" alt="Frame 7" />
            </li>
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            <li>
                <img src="./Frame 1.png" alt="Frame 1" />
            </li>
            <li>
                <img src="./Frame 2.png" alt="Frame 2" />
            </li>
            <li>
                <img src="./Frame 3.png" alt="Frame 3" />
            </li>
            <li>
                <img src="./Frame 4.png" alt="Frame 4" />
            </li>
            <li>
                <img src="./Frame 5.png" alt="Frame 5" />
            </li>
            <li>
                <img src="./Frame 6.png" alt="Frame 6" />
            </li>
            <li>
                <img src="./Frame 7.png" alt="Frame 7" />
            </li>
        </ul>                      
    </div>
    </>
    );
  };
  