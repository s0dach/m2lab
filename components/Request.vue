<template>
  <div v-if="!isLoading">
    <slide-over>
      <div class="flex justify-center">
        <div class="w-[313px] border-[#e9eaed] rounded-md border p-[10px]">
          <div class="max-w-xl lg:max-w-lg flex justify-between items-center">
            <div class="flex items-center">
              <h2 class="w-26 h-5 flex-grow-0 font-semibold text-left text-black text-sm">{{ leadDate?.leadName }}</h2>
              <!--          <div class="ml-3 cursor-pointer">-->
              <!--            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">-->
              <!--              <path-->
              <!--                  d="M12.646 3.865 13.912 2.6A1.406 1.406 0 1 1 15.9 4.59l-7.965 7.963a3.375 3.375 0 0 1-1.422.848L4.5 14l.6-2.014c.16-.537.451-1.026.848-1.423l6.698-6.698zm0 0 1.979 1.979M13.5 11v3.563a1.687 1.687 0 0 1-1.688 1.687H3.939a1.687 1.687 0 0 1-1.688-1.688V6.689A1.687 1.687 0 0 1 3.938 5H7.5"-->
              <!--                  stroke="#C8CBD1" stroke-linecap="round" stroke-linejoin="round"/>-->
              <!--            </svg>-->
              <!--          </div>-->
            </div>
            <div class="cursor-pointer">
              <UDropdown :items="settings" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                         :popper="{ placement: 'bottom-start' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                      d="M7.757 2.955a.844.844 0 0 1 .833-.705h.82c.412 0 .764.299.832.705l.111.67c.053.318.289.574.585.698.299.123.642.106.904-.081l.553-.395a.844.844 0 0 1 1.088.09l.58.58c.292.292.33.752.09 1.088l-.396.552a.933.933 0 0 0-.08.904c.123.297.379.532.697.585l.67.112c.407.067.705.42.705.832v.82a.843.843 0 0 1-.705.833l-.67.111c-.319.053-.574.288-.697.586a.933.933 0 0 0 .08.902l.395.554a.844.844 0 0 1-.09 1.087l-.58.58a.844.844 0 0 1-1.087.09l-.553-.395a.932.932 0 0 0-.903-.08c-.298.123-.532.378-.585.696l-.112.671a.844.844 0 0 1-.833.705h-.82a.845.845 0 0 1-.833-.705l-.11-.67c-.054-.319-.289-.573-.586-.698a.935.935 0 0 0-.903.081l-.554.395a.844.844 0 0 1-1.087-.09l-.58-.58a.843.843 0 0 1-.09-1.088l.395-.553a.935.935 0 0 0 .081-.902c-.124-.298-.38-.533-.697-.585l-.671-.113a.844.844 0 0 1-.705-.832v-.82c0-.413.299-.765.705-.833l.67-.111c.319-.053.574-.288.698-.585a.932.932 0 0 0-.081-.904l-.394-.553a.844.844 0 0 1 .09-1.088l.58-.58a.844.844 0 0 1 1.087-.09l.553.396a.934.934 0 0 0 .903.08c.297-.123.532-.379.585-.696l.112-.671z"
                      stroke="#8B8E92" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.25 9a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" stroke="#8B8E92"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
                <template v-slot:item="{ item }">
                  <button
                      @click="handleItemClick(item)"
                      class="group flex items-center gap-1.5 w-full px-1.5 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-200"
                      id="headlessui-menu-item-nctlRmIk4j0_20" role="menuitem" tabindex="-1" data-headlessui-state="">
                    <span class="truncate">{{ item.label }}</span>
                  </button>
                </template>
              </UDropdown>
            </div>
          </div>
          <h3 class="text-[0.625rem]">Обновлено: {{ leadDate.updatedAt }}</h3>
          <div class="mt-2.5 text-[#595759] flex justify-between">
            <div>
              <h3 class="text-xs">Дата создания</h3>
              <UPopover :popper="{ placement: 'bottom-start' }">
                <UButton :label="formatDate(date).split(' ')[0]" icon="i-heroicons-calendar-days-20-solid"
                         class="flex flex-row-reverse justify-between px-[12px] py-[6px] bg-white text-black font-thin border border-[#c8cbd1] rounded-md hover:bg-[#c8cbd1] w-[142px]"/>
                <template #panel="{ close }">
                  <DatePicker v-model="date" is-required @close="close"/>
                </template>
              </UPopover>
            </div>
            <div>
              <h3 class="text-xs">Доска</h3>
              <UDropdown :items="[leadReference.leadBoards]" mode="hover" :popper="{ placement: 'bottom-start' }"
                         class="w-full ">
                <UButton color="white" :label="leadReference.leadBoards[0].label"
                         trailing-icon="i-heroicons-chevron-down-20-solid"
                         class="ring-opacity-0 flex justify-between px-[12px] py-[6px] bg-white text-black font-thin border border-[#c8cbd1] rounded-md hover:bg-[#c8cbd1] w-full"/>
              </UDropdown>
            </div>
          </div>
          <div class="mt-2.5 text-[#595759] w-full">
            <h3 class="text-xs"></h3>
            <UDropdown :items="[leadReference.managerList]" mode="hover" :popper="{ placement: 'bottom-start' }"
                       class="w-full ">
              <UButton color="white" :label="manager.name"
                       trailing-icon="i-heroicons-chevron-down-20-solid"
                       class="ring-opacity-0 flex justify-between px-[12px] py-[6px] bg-white text-black font-thin border border-[#c8cbd1] rounded-md hover:bg-[#c8cbd1] w-full"/>
            </UDropdown>
          </div>
          <div>
            <h2 class="w-26 h-5 flex-grow-0 font-semibold text-left text-black text-sm mt-2.5">Основной контакт</h2>
          </div>
          <div class="mt-2">
            <h3 class="text-xs text-[#595759]">ФИО</h3>
            <h3 class="text-sm text-[#252525]" v-if="!isEdit">
              {{ leadDate.contacts.nickName ? leadDate.contacts.nickName : 'Отсутствует' }}</h3>
            <UInput class="ring-opacity-0" v-model="leadDate.contacts.nickName" v-if="isEdit"/>
          </div>
          <div class="mt-2">
            <h3 class="text-xs text-[#595759]">Дата рождения</h3>
            <h3 class="text-sm text-[#252525]" v-if="!isEdit">{{ birthDate }}</h3>
            <UInput class="ring-opacity-0" v-model="birthDate" v-if="isEdit"/>
          </div>
          <div class="mt-2">
            <div class="flex justify-between align-center">
              <h3 class="text-xs text-[#595759]">Номер телефона</h3>
              <div class="flex align-center" v-if="isEdit">
                <UCheckbox :model-value="false" inputClass="w-[10px] h-[10px] rounded-none">
                  <template #label>
                    <span class="text-xs text-[#595759] ms-0">нет телефона</span>
                  </template>
                </UCheckbox>
              </div>
            </div>
            <h3 class="text-sm text-[#006eff]" v-if="!isEdit">{{ formatNumber(leadDate.contacts.phone) }}</h3>
            <UInput class="ring-opacity-0" v-model="leadDate.contacts.phone" v-if="isEdit"/>
          </div>
          <div class="mt-2">
            <h3 class="text-xs text-[#595759]">Доп. номер телефона</h3>
            <h3 class="text-sm text-[#006eff]" v-if="!isEdit">
              {{ formatNumber(leadDate.contacts.additionalContacts[0].contact) }}</h3>
            <UInput class="ring-opacity-0" v-model="leadDate.contacts.additionalContacts[0].contact" v-if="isEdit"/>
          </div>
          <div class="mt-2">
            <h3 class="text-xs text-[#595759]">Канал поступления</h3>
            <h3 class="text-sm text-[#006eff]" v-if="!isEdit">{{ channel.title }}</h3>
            <UDropdown v-if="isEdit" :items="[leadReference.leadSources]" mode="hover"
                       :popper="{ placement: 'bottom-start' }"
                       class="w-full ">
              <UButton color="white" :label="channel.title"
                       trailing-icon="i-heroicons-chevron-down-20-solid"
                       class="ring-opacity-0 flex justify-between px-[12px] py-[6px] bg-white text-black font-thin border border-[#c8cbd1] rounded-md hover:bg-[#c8cbd1] w-full"/>
            </UDropdown>
          </div>
          <UButton @click="saveBoard(leadDate, manager, date)" class="mt-2.5 flex justify-center w-full"
                   variant="solid">Сохранить
          </UButton>
        </div>
      </div>
    </slide-over>
  </div>
  <div v-else>Загрузка...</div>
</template>

<script setup>
import {reactive, ref, onMounted} from 'vue';
import DatePicker from '@/components/UI/DatePicker.vue';
import SlideOver from '@/components/UI/SlideOver.vue';
import {formatDate} from "@/components/utils.js";
import {fetchLeadCards, saveBoard} from "@/components/api.js";

const date = ref(new Date());
const isEdit = ref(false);
const birthDate = '10.09.1991';
let manager = reactive({});
let channel = reactive({});

let leadDate = reactive({});
let leadReference = reactive({});
let isLoading = ref(true);

const formatNumber = (phoneNumber) => {
  return phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
}

const settings = [
  [{
    label: 'Редактировать поля',
    id: 0,
  },
    {
      label: 'Настройка отображения',
      id: 1
    }]
];

const handleItemClick = (item) => {
  if (item.id === 0) {
    isEdit.value = !isEdit.value;
  }
}

const setupState = async () => {
  try {
    isLoading.value = true;
    const data = await fetchLeadCards();
    leadDate = data.leadDate;
    leadReference = data.leadReference;
    manager = data.manager;
    channel = data.channel;
  } catch (e) {
    console.log('err', e)
  } finally {
    isLoading.value = false;
  }
}
onMounted(async () => {
  await setupState();
});
</script>