<template>
	<div class="flex bg-slate-100">
		<SideBar />
		<div class="w-full">
			<NavBar />
			<BodyContent bg="">
				<div class="grid gap-y-3">
					<div class="grid lg:grid-cols-5 sm:grid-cols-1 gap-4 ">
						<CardBox icon="favorite" label-box="Grade AO" value-box="255" chip="7.9" />
						<CardBox icon="crosshair" label-box="Target" value-box="255" chip="2.9" />
						<CardBox icon="process" label-box="Lancar" value-box="255" chip="2.9" />
						<CardBox icon="money-stack" label-box="DPK" value-box="255" chip="2.9" />
						<CardBox icon="chart-down" label-box="Non Lancar" value-box="255" chip="2.9" />
					</div>
					<SizedBox>
						<div class="pT-40 text-lg font-bold p-10">
							Recent Order
						</div>


						<div class=" overflow-x-auto">
							<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead
									class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" class="px-6 py-3">
											Product name
										</th>
										<th scope="col" class="px-6 py-3">
											Customer ID
										</th>
										<th scope="col" class="px-6 py-3">
											Tenor
										</th>
										<th scope="col" class="px-6 py-3">
											Outstanding
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											KAMU
										</th>
										<td class="px-6 py-4">
											012312030
										</td>
										<td class="px-6 py-4">
											36
										</td>
										<td class="px-6 py-4">
											180.000.000,00
										</td>
									</tr>
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											KAMA
										</th>
										<td class="px-6 py-4">
											012312031
										</td>
										<td class="px-6 py-4">
											48
										</td>
										<td class="px-6 py-4">
											28.000.000,00
										</td>
									</tr>
									<tr class="bg-white dark:bg-gray-800">
										<th scope="row"
											class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											KPM
										</th>
										<td class="px-6 py-4">
											012312031
										</td>
										<td class="px-6 py-4">
											60
										</td>
										<td class="px-6 py-4">
											490.000.000,00
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</SizedBox>
				</div>
			</BodyContent>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import SideBar from "@/views/SideBar.vue";
import NavBar from "@/views/NavBar.vue";
import BodyContent from "@/views/BodyContent.vue";
import CardBox from "@/components/CardBox.vue";
import SizedBox from "@/components/SizedBox.vue";
import router from "@/router";

onMounted(() => {
	if (!localStorage.getItem("token")) {
		router.replace("/");
	}
});
</script>