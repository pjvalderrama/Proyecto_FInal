import { Link, redirect } from 'react-router-dom';
import { doRequest, parseFormData } from '@/api/utilities';
import { updateRequest } from '@/api/v1/request';
import { Divider } from '@/components/Divider';
import {
	UpdateRequestForm,
	formFields as updateRequestFields,
} from '@/components/Forms/UpdateRequestForm';
import { Logo } from '@/components/Logo';


export async function action({ request }) {
	const formData = await request.formData();
	const body = parseFormData(formData, updateRequestFields);

	// body.isFragile = body.isFragile === 'true' ? true : false;

	const dueWithoutOffset = new Date(`${body.dueDate}T${body.dueHour}.000Z`);
	const due = new Date(
		dueWithoutOffset.getTime() +
			dueWithoutOffset.getTimezoneOffset() * 60 * 1000,
	);

	body.due = due.toISOString();

	try {
		await doRequest({
			body,
			endpoint: updateRequest,
			success: 'Se ha actualizado su solicitud!',
		});

		return redirect('/client/requests');
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}

export function UpdateRequest() {
	
	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-3xl">
				<div className="flex flex-col p-8 space-y-4">
					<div className="flex w-full justify-between">
						<h1 className="flex align-center text-2xl text-gray-900">
							<Logo spin /> &nbsp; - Actualizar Solicitud
						</h1>
						<Link
							to="/client/requests"
							className="pt-2 text-slate-500 italic cursor-pointer hover:underline"
						>
							Volver
						</Link>
					</div>
					<Divider />

					<UpdateRequestForm />
				</div>
			</div>
		</section>
	);
}
