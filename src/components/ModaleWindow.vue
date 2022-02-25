<template>
    <transition name="modal">
        <div class="modal__mask">
          <div class="modal__wrapper" @click="$emit('close')">
            <div class="modal__container" @click.stop>

              <div class="modal__header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal__body">
                <slot name="body">
                  default body
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>