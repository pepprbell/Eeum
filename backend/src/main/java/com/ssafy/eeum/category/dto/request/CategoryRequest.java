package com.ssafy.eeum.category.dto.request;

import com.ssafy.eeum.category.domain.Category;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

/**
 * com.ssafy.eeum.category.dto.request
 * CategoryRequest.java
 * @date    2021-04-07 오후 5:10
 * @author  차수연
 *
 * @변경이력
 **/

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@ApiModel(description = "카테고리 등록 모델")
public class CategoryRequest {
    @ApiModelProperty(value = "단어")
    @NotBlank
    @Length(max = 10, message = "카테고리 이름의 최대 길이는 10자 입니다.")
    private String word;

    public CategoryRequest(@NotBlank @Length(max = 10, message = "단어의 최대 길이는 10자 입니다.") String word) {
        this.word = word;
    }

    public Category toCategory() {
        return Category.builder()
                .word(word)
                .build();
    }
}