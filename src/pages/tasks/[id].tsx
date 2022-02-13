import UserInfo from "components/UserInfo"
import {addApolloState, initializeApollo} from "lib/apolloClient";
import GET_TASK_INFO from "../../../queries/getTaskInfo.graphql"
import TaskInfo from "components/TaskInfo";
import GET_ALL_TASKS from "../../../queries/getAllTasks.graphql";


const TaskPage = ({task}) => {
    return (
        <>
            <TaskInfo task={task}/>
        </>
    )
}

export const getStaticPaths = async () => {
    const apolloClient = initializeApollo();

    const response = await apolloClient.query({
        query: GET_ALL_TASKS
    })

    const data = response?.data

    const paths = data?.tasks.map(({id}) => ({
        params: {id: id.toString()}
    }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const apolloClient = initializeApollo();
    const { id } = context.params;

    const response = await apolloClient.query({
        query: GET_TASK_INFO,
        variables: {
            id,
        },
    })

    const data = response?.data
    return addApolloState(apolloClient, {
        props: {task: data}
    })
}



export default TaskPage