
import { Input } from '../components/Input';
import { LikeButton as LikeButton1 } from '../components/LikeButton_class';
import { LikeButton } from '../components/LikeButton_func';
import { StateDiff } from '../components/StateDiff';
import { TestUseRef, TestUseRef2 } from '../components/TestUseRef';
import { TwoButton } from '../components/TwoButtons';


export default function HomePage() {
  return <>
    <TwoButton />
    <TestUseRef2 />
    <TestUseRef />
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