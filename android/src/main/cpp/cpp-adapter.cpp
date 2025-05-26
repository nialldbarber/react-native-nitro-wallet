#include <jni.h>
#include "NitroWalletOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitrowallet::initialize(vm);
}
