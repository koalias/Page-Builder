import { usePages } from '../hooks/usePages';
import { PageCard } from '../components/PageCard';

export const HomePage = (props) => {
	console.log('props', props)
	const { id } = props.currentUserProp
	const { pages } = usePages();
	return (
		<div className="" style={{ height: "100vh"}}>
			<div className="grid grid-cols-2 p-8 place-items-center">
				{ Array.isArray(pages) && pages.length > 0 ? (
					pages.map(page => (
						<PageCard
						userId={id}
						key={page._id}
						id={page._id}
						name={page.name}
						thumbnail={page.thumbnail}
						className="bg-gray-800 rounded-md text-indigo-50"
						></PageCard>
						))
						) : (
							<div className="">
						<h1 className="text-center">You haven't made any pages yet!</h1>
						<a href="/templates" className="btn btn-primary">
							CLICK HERE TO CREATE A PAGE :)
						</a>
					</div>
				)} 
			</div>
		</div>
	);
};
