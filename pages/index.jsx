
import { Input } from '../components/Input';
import { LikeButton as LikeButton1 } from '../components/LikeButton_class';
import { LikeButton } from '../components/LikeButton_func';
import { StateDiff } from '../components/StateDiff';


export default function HomePage() {
  return <>
    <StateDiff />
    <Input />
    <hr />
    <h1>Hello, Next.js!!!!!!</h1>
    <hr />
    class:
    <LikeButton1 color="green" start="100" />
    <LikeButton1 big step="9" start={99} />
    <hr />
    funct:
    <LikeButton />
    <LikeButton color="green" start="100" />
    <LikeButton big step="9" start={99} border />
  </>;
}