import Code from "../../components/codeEditor/CodeEditor";
import ProblemViewer from "../../components/problemViewer/ProblemViewer";
import { useRouter } from "next/router";

export default function Problem(){

    const router = useRouter();
    const id = router.query.id || "0";
    return (
        <div className="body">
            {router.query.id && <ProblemViewer id={parseInt(id)}/> }
            <Code />
        </div>
    )
}